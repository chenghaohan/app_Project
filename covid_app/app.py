import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
import json
import numpy as np
import pandas as pd

app = Flask(__name__)


# Create an engine 
engine = create_engine("postgresql+psycopg2://cggjytcd:2Lf6GkD0Cb8TbV6e4-X7ZBCvNMh_zV3F@raja.db.elephantsql.com:5432/cggjytcd", echo=False)

# Reflect Database into ORM classes
Base = automap_base()
Base.prepare(engine, reflect=True)


can_cases = Base.classes.can_cases
can_deaths = Base.classes.can_deaths
vaccine_admin = Base.classes.vaccine_admin
canadian_coordinates = Base.classes.canadian_coordinates
global_cases = Base.classes.global_cases
global_deaths = Base.classes.global_deaths
world_coordinates = Base.classes.world_cordinates
zoom = Base.classes.zoom
slack = Base.classes.slack
cisco = Base.classes.cisco
shopify = Base.classes.shopify
cnn_news = Base.classes.cnn_news


session = Session(engine)

## FRONT_END ROUTES
@app.route("/")
def main(): 
    return render_template("index.html")


## SERVICE ROUTES

@app.route("/api/main/news")
def newsRoute(): 
    #pulling news table from SQL server
    news = session.query(cnn_news.Date,cnn_news.Event).all()
    
    news_data = []

    for i in news:
        date = i[0].strftime("%m/%d/%Y")

        # convert date to string date via datetime strftime function
        event = i[1]

        news_output = {"event": event, "news_Date": date }

        news_data.append(news_output)
    
    return jsonify(news_data)


## Stock Prices
@app.route("/api/main/stockdata")
def stockRoute(): 
    #pulling zoom prices from SQL server
    zoom_data = session.query(zoom.Date,zoom.Open,zoom.High,zoom.Low,zoom.Close,zoom.Volume).all()
    
    zoom_Date = []
    for item in zoom_data:
        zoom_Date.append(item[0])
    
    zoom_Open = []
    for item in zoom_data:
        zoom_Open.append(item[1])
    
    zoom_High = []
    for item in zoom_data:
        zoom_High.append(item[2])
    
    zoom_Low = []
    for item in zoom_data:
        zoom_Low.append(item[3])
    
    zoom_Close = []
    for item in zoom_data:
        zoom_Close.append(item[4])
    
    zoom_Vol = []
    for item in zoom_data:
        zoom_Vol.append(item[5])

    zoom_output = { "zoom_Date" : zoom_Date,
               "zoom_Open" : zoom_Open,
               "zoom_High" : zoom_High,
               "zoom_Low" : zoom_Low,
               "zoom_Close" : zoom_Close,
               "zoom_Volume" : zoom_Vol
     }


    #pulling slack prices from SQL server
    slack_data = session.query(slack.Date,slack.Open,slack.High,slack.Low,slack.Close,slack.Volume).all()
    
    slack_Date = []
    for item in slack_data:
        slack_Date.append(item[0])
    
    slack_Open = []
    for item in slack_data:
        slack_Open.append(item[1])
    
    slack_High = []
    for item in slack_data:
        slack_High.append(item[2])
    
    slack_Low = []
    for item in slack_data:
        slack_Low.append(item[3])
    
    slack_Close = []
    for item in slack_data:
        slack_Close.append(item[4])
    
    slack_Vol = []
    for item in slack_data:
        slack_Vol.append(item[5])

    slack_output = { 
               "slack_Date" : slack_Date,
               "slack_Open" : slack_Open,
               "slack_High" : slack_High,
               "slack_Low" : slack_Low,
               "slack_Close" : slack_Close,
               "slack_Volume" : slack_Vol
     }

    #pulling cisco prices from SQL server
    cisco_data = session.query(cisco.Date,cisco.Open,cisco.High,cisco.Low,cisco.Close,cisco.Volume).all()
    
    cisco_Date = []
    for item in cisco_data:
        cisco_Date.append(item[0])
    
    cisco_Open = []
    for item in cisco_data:
        cisco_Open.append(item[1])
    
    cisco_High = []
    for item in cisco_data:
        cisco_High.append(item[2])
    
    cisco_Low = []
    for item in cisco_data:
        cisco_Low.append(item[3])
    
    cisco_Close = []
    for item in cisco_data:
        cisco_Close.append(item[4])
    
    cisco_Vol = []
    for item in cisco_data:
        cisco_Vol.append(item[5])

    cisco_output = { 
               "cisco_Date" : cisco_Date,
               "cisco_Open" : cisco_Open,
               "cisco_High" : cisco_High,
               "cisco_Low" : cisco_Low,
               "cisco_Close" : cisco_Close,
               "cisco_Volume" : cisco_Vol
     }

    #shopify data
    shopify_data = session.query(shopify.Date,shopify.Open,shopify.High,shopify.Low,shopify.Close,shopify.Volume).all()
    shopify_Date = []
    for item in shopify_data:
        shopify_Date.append(item[0])
    shopify_Open = []
    for item in shopify_data:
        shopify_Open.append(item[1])
    shopify_High = []
    for item in shopify_data:
        shopify_High.append(item[2])
    shopify_Low = []
    for item in shopify_data:
        shopify_Low.append(item[3])
    shopify_Close = []
    for item in shopify_data:
        shopify_Close.append(item[4])
    shopify_Vol = []
    for item in shopify_data:
        shopify_Vol.append(item[5])
    shopify_output = { "shopify_Date" : shopify_Date,
               "shopify_Open" : shopify_Open,
               "shopify_High" : shopify_High,
               "shopify_Low" : shopify_Low,
               "shopify_Close" : shopify_Close,
               "shopify_Volume" : shopify_Vol
     }
    
    final_output = []
    final_output.extend((zoom_output,cisco_output,slack_output,shopify_output))
    return jsonify(final_output)

## Canadian Cases, Deaths, Vaccines by Province
@app.route("/api/main/cancovid")
def cancovidRoute(): 
    

    cases_data = session.query(can_cases.Province, can_cases.No_Cases).filter(can_cases.Date_dt =="Sun, 31 Jan 2021 00:00:00 GMT").all()
    cases_dataset = {}
    provinces = []
    no_cases = []
    for item in cases_data:
        provinces.append(item[0])
        no_cases.append(item[1])
        cases_dataset = dict(zip(provinces, no_cases))
   
    cases = []
    for item in cases_data:
       cases.append(item[1])
       total_cases = sum(cases)

    deaths_data = session.query(can_deaths.Province, can_deaths.No_Deaths).filter(can_deaths.Date_dt =="Sun, 31 Jan 2021 00:00:00 GMT").all()
    deaths_dataset = []
    for item in deaths_data:
        deaths_dataset.append(item)

    deaths = []
    for item in deaths_data:
       deaths.append(item[1])
       total_deaths = sum(deaths)

    vaccine_data = session.query(vaccine_admin.Province, vaccine_admin.Vaccine_Administered).all()
    vaccine_dataset = []
    for item in vaccine_data:
        vaccine_dataset.append(item)

    vaccine = []
    for item in vaccine_data:
        vaccine.append(item[1])
        total_vaccine = sum(vaccine)
    
    can_coor_data = session.query(canadian_coordinates.Province, canadian_coordinates.Latitude, canadian_coordinates.Longitude).all()
    can_coor_dataset = []
    for item in can_coor_data:
        can_coor_dataset.append(item)
    
   
   
    
    output = {  "Total_Cases": total_cases,
                "Total_Deaths": total_deaths,
                 "Total_Vaccine": total_vaccine,
                "Canadian_Cases" : [cases_dataset], 
                "Canadian_Deaths" : [deaths_dataset], 
                "Canadian_Vaccines Admin" : [vaccine_dataset], 
                "Canadian_Coordinates" : [can_coor_dataset]}
                
    return jsonify(output)


## Canadian Cases, Deaths, Vaccines by Province
@app.route("/api/main/provcovid")
def provcovidRoute(): 

    deaths_data = session.query(can_deaths.Province, can_deaths.No_Deaths).filter(can_deaths.Date_dt =="Sun, 31 Jan 2021 00:00:00 GMT").order_by(can_deaths.Province.desc()).all()
    vaccine_data = session.query(vaccine_admin.Province, vaccine_admin.Vaccine_Administered).order_by(vaccine_admin.Province.desc()).all()
    cases_data = session.query(can_cases.Province, can_cases.No_Cases).filter(can_cases.Date_dt =="Sun, 31 Jan 2021 00:00:00 GMT").order_by(can_cases.Province.desc()).all()

    master_dict={}
    for i, row in enumerate(deaths_data):
        master_dict[row[0]]={
            'deaths': row[1],
            'cases': cases_data[i][1],
            'vaccines': vaccine_data[i][1]
        }
        

    return jsonify(master_dict)


@app.route("/api/main/canmap")
def canmap(): 
    with open("covid_app/assets/data/canada_provinces.geojson", "r") as f: 
         canada_geojson = json.load(f)
    return jsonify(canada_geojson)

# ## Global Cases, Deaths
@app.route("/api/main/globalcovid")
def globalcovidRoute(): 
    
    global_cases_data = session.query(global_cases.Country, global_cases.Date_dt, global_cases.No_Cases).filter(global_cases.Date_dt =="Sun, 31 Jan 2021 00:00:00 GMT").all()
    global_cases_dataset = []   
    for item in global_cases_data:
        global_cases_dataset.append(item)
    
    global_deaths_data = session.query(global_deaths.Country, global_deaths.Date_dt, global_deaths.No_Deaths).filter(global_deaths.Date_dt =="Sun, 31 Jan 2021 00:00:00 GMT").all()
    global_deaths_dataset = []
    for item in global_deaths_data:
        global_deaths_dataset.append(item)
    
    world_coor_data = session.query(world_coordinates.Country, world_coordinates.Latitude, world_coordinates.Longitude).all()
    world_coor_dataset = []
    for item in world_coor_data:
        world_coor_dataset.append(item)

    output = { "Global_Cases" : [global_cases_dataset], 
                "Global_Deaths" : [global_deaths_dataset], 
                "World_Coordinates" : [world_coor_dataset]}
    return jsonify(output)



if __name__ == "__main__":
    app.run()