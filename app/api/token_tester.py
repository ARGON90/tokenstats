from http.cookies import _quote
from urllib import response
from flask import Blueprint, request
from requests import Session
from app.models.tokens import Token
from app.forms.tokens_form import UpdateToken
import requests
import json

def tester():
    all_tokens = Token.query.all()

    print(all_tokens)

tester()
