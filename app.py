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

app = Flask(__name__)

#app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+psycopg2://cggjytcd:2Lf6GkD0Cb8TbV6e4-X7ZBCvNMh_zV3F@raja.db.elephantsql.com:5432/cggjytcd"
#db = SQLAlchemy(app)

# Create an engine for the chinook.sqlite database
engine = create_engine("postgresql+psycopg2://cggjytcd:2Lf6GkD0Cb8TbV6e4-X7ZBCvNMh_zV3F@raja.db.elephantsql.com:5432/cggjytcd", echo=False)

# Reflect Database into ORM classes
Base = automap_base()
Base.prepare(engine, reflect=True)

print(Base.classes.keys())
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


session = Session(engine)

## FRONT_END ROUTES
@app.route("/")
def main(): 
    return render_template("index.html")


## SERVICE ROUTES

## Stock Prices
@app.route("/api/main/stockdata")
def stockRoute(): 
    
    zoom_data = session.query(zoom.Date,zoom.Open,zoom.High,zoom.Low,zoom.Close,zoom.Volume).all()
    
    zoom_Date = []
    for item in zoom_data[0]:
        zoom_Date.append(item)
    
    zoom_Open = []
    for item in zoom_data[1]:
        zoom_Open.append(item)
    
    zoom_High = []
    for item in zoom_data[2]:
        zoom_High.append(item)
    
    zoom_Low = []
    for item in zoom_data[3]:
        zoom_Low.append(item)
    
    zoom_Close = []
    for item in zoom_data[4]:
        zoom_Close.append(item)
    
    zoom_Vol = []
    for item in zoom_data[5]:
        zoom_Vol.append(item)

    zoom_output = { "zoom_Date" : zoom_Date,
               "zoom_Open" : zoom_Open,
               "zoom_High" : zoom_High,
               "zoom_Low" : zoom_Low,
               "zoom_Close" : zoom_Close,
               "zoom_Volume" : zoom_Vol
     }
    return jsonify(zoom_output)

## Canadian Cases, Deaths, Vaccines by Province
@app.route("/api/main/cancovid")
def cancovidRoute(): 
    
    cases_data = session.query(can_cases.Province, can_cases.Date_dt, can_cases.No_Cases).filter(can_cases.Date_dt =="Sun, 31 Jan 2021 00:00:00 GMT").all()
    cases_dataset = []
    for item in cases_data:
        cases_dataset.append(item)
    
    deaths_data = session.query(can_deaths.Province, can_deaths.Date_dt, can_deaths.No_Deaths).filter(can_deaths.Date_dt =="Sun, 31 Jan 2021 00:00:00 GMT").all()
    deaths_dataset = []
    for item in deaths_data:
        deaths_dataset.append(item)

    vaccine_data = session.query(vaccine_admin.Province, vaccine_admin.Date, vaccine_admin.Vaccine_Administered).all()
    vaccine_dataset = []
    for item in vaccine_data:
        vaccine_dataset.append(item)
    
    can_coor_data = session.query(canadian_coordinates.Province, canadian_coordinates.Latitude, canadian_coordinates.Longitude).all()
    can_coor_dataset = []
    for item in can_coor_data:
        can_coor_dataset.append(item)

    output = { "Canadian_Cases" : [cases_dataset], 
                "Canadian Deaths" : [deaths_dataset], 
                "Canadian Vaccines Admin" : [vaccine_dataset], 
                "Canadian Coordinates" : [can_coor_dataset]}
    return jsonify(output)

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

    output = { "Global Cases" : [global_cases_dataset], 
                "Global Deaths" : [global_deaths_dataset], 
                "World Coordinates" : [world_coor_dataset]}
    return jsonify(output)



if __name__ == "__main__":
    app.run()