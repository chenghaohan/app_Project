import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql+psycopg2://cggjytcd:2Lf6GkD0Cb8TbV6e4-X7ZBCvNMh_zV3F@raja.db.elephantsql.com:5432/cggjytcd"
db = SQLAlchemy(app)



## FRONT_END ROUTES
@app.route("/")
def main(): 
    return render_template("templates/index.html")


## SERVICE ROUTES

## Stock Prices
@app.route("/api/main/stockdata")
def firstRoute(): 
    data = db.session.query(Cases.City, Cases.Count).filter(Cases.city =="Toronto").all()
    return jsonify(data)

## Canadian Cases, Deaths, Vaccines by Province
@app.route("/api/main/cancovid")
def firstRoute(): 
    data = db.session.query(Cases.City, Cases.Count).filter(Cases.city =="Toronto").all()
    return jsonify(data)

## Global Cases, Deaths
@app.route("/api/main/globalcovid")
def firstRoute(): 
    data = db.session.query(Cases.City, Cases.Count).filter(Cases.city =="Toronto").all()
    return jsonify(data)



if __name__ == "__main__":
    app.run()