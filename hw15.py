
# coding: utf-8

# In[2]:

import pandas as pd
from flask import Flask, render_template, jsonify 


# In[3]:

app = Flask(__name__)


# In[4]:

#pd.read_csv("Belly_Button_Biodiversity_Metadata.csv")


# In[5]:

names_df = pd.read_csv("belly_button_biodiversity_samples.csv")


# In[6]:

sample_names = list(names_df)[1:]


# In[7]:

otu_list = pd.read_csv("belly_button_biodiversity_otu_id.csv")


# In[8]:

otus = otu_list['lowest_taxonomic_unit_found'].tolist()


# In[9]:

metadata = pd.read_csv("Belly_Button_Biodiversity_Metadata.csv")


# In[10]:

metadata.columns


# In[19]:

metadata = metadata[["AGE", "BBTYPE", "ETHNICITY", "GENDER", "LOCATION", "SAMPLEID"]]


# In[20]:

metadata[metadata.SAMPLEID == 947].to_dict("records")


# In[ ]:




# In[ ]:

@app.route('/names')
def names():  
    return jsonify(sample_names) 

@app.route("/")
def index(): 
    return render_template("index.html")

@app.route('/otu')
def otu(): 
    return jsonify(otus)

@app.route('/metadata/<sample>')
def metadata(sample): 
    metadata = pd.read_csv("Belly_Button_Biodiversity_Metadata.csv")
    metadata = metadata[["AGE", "BBTYPE", "ETHNICITY", "GENDER", "LOCATION", "SAMPLEID"]]
    sample_id = sample[3:]
    record = metadata[metadata["SAMPLEID"] == int(sample_id)].to_dict("records")
    return jsonify(record)

@app.route('/wfreq/<sample>')
def wfreq(sample): 
    metadata = pd.read_csv("Belly_Button_Biodiversity_Metadata.csv")
    sample_id = sample[3:]
    wfreq = metadata[metadata["SAMPLEID"] == int(sample_id)].WFREQ.values[0]
    return jsonify(wfreq) 

@app.route('/samples/<sample>')
def samples(sample): 
    names_df = pd.read_csv("belly_button_biodiversity_samples.csv")
    otu_samp = names_df[sample].sort_values(ascending = False).reset_index().to_dict("list")
    otu_ids = otu_samp["index"]
    sample_values = otu_samp[sample] 
    return jsonify({"otu_ids": otu_ids, "sample_values": sample_values})


if __name__ == '__main__':
    app.run(host="127.0.0.1", port=9999, debug=True)





