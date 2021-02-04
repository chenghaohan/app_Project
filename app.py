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


session = Session(engine)

## FRONT_END ROUTES
@app.route("/")
def main(): 
    return render_template("index.html")


## SERVICE ROUTES

## Stock Prices
@app.route("/api/main/stockdata")
def firstRoute(): 
    
    data = session.query(can_cases.No_Cases).all()
    dataset = []
    for item in data:
        dataset.append(item)

    output = { "output" : [dataset] }
    return jsonify(output)

## Canadian Cases, Deaths, Vaccines by Province
@app.route("/api/main/cancovid")
def cancovidRoute(): 
    
    cases_data = session.query(can_cases.Province, can_cases.Date_dt, can_cases.No_Cases).all()
    cases_dataset = []
    for item in cases_data:
        cases_dataset.append(item)
    
    deaths_data = session.query(can_deaths.Province, can_deaths.Date_dt, can_deaths.No_Deaths).all()
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
# @app.route("/api/main/globalcovid")
# def firstRoute(): 
#     data = db.session.query(global_cases, global_deaths, world_cordinates).all()
#     return jsonify(data)



if __name__ == "__main__":
    app.run()