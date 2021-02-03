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
#Base.classes()
print(Base.classes.keys())
can_cases = Base.classes.can_cases

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
# @app.route("/api/main/cancovid")
# def firstRoute(): 
#     data = db.session.query(can_cases, can_deaths, vaccine_admin, canadian_coordinates).all()
#     return jsonify(data)

# ## Global Cases, Deaths
# @app.route("/api/main/globalcovid")
# def firstRoute(): 
#     data = db.session.query(global_cases, global_deaths, world_cordinates).all()
#     return jsonify(data)



if __name__ == "__main__":
    app.run()