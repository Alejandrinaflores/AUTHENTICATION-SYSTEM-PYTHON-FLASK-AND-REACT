"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email, password = password).first()
    if user is None:
        new_user = User(email = email, password = password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Welcome! you're now signed up!"}), 200
    else:
        return jsonify({"msg": "Sorry! User already exist, try again!"}), 400

@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email = email, password = password).first()
    if user is None:
        return jsonify({"msg": "User not found. Please, try again!"}), 400
    access_token= create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id, "msg": "Welcome!"}), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"logged": True }), 200
    else:
        return jsonify({"logged": False }), 400

@api.route('/logout', methods=['DELETE'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    return jsonify({"msg": "Successfully logged out"}), 200