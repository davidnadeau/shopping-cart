import json
import os
import requests
import decimal
import random
import codecs
import time
from StringIO import StringIO

# Generate a random price between i and j.
def randomPrice(i, j):
	return str(decimal.Decimal('%d.%d' % (random.randint(i,j),random.randint(0,99))))

# Create the insert statements to quickly load product database.
def buildSQL(movieTitle, imagePath):
	return 'INSERT INTO products (id, name, price, image_path, updated_at, created_at) VALUES (NULL,'+ movieTitle+', '+randomPrice(5,50)+', '+imagePath+', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);'

# Read all the movies in movies.txt.
# Get a path to the first image returned from google images.
# Store to insert statements in movies.sql.
def generateData():
	BASE_URL = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='
	movieTitles = [movieTitle.strip() for movieTitle in codecs.open('movies.txt','r','iso-8859-1')]
	f = codecs.open('movies.sql','w','iso-8859-1')
	for movieTitle in movieTitles:
		r = requests.get(BASE_URL+movieTitle)
		res = json.loads(r.text)['responseData']
		if res is not None:
			print('success')
			imagePath = res['results'][0]['unescapedUrl']
		else:
			print('failed')
			imagePath = 'http://www.sitindia.com/res/img/img-not-found.png'
		f.write(buildSQL(movieTitle, imagePath)+'\n')
		# google gets angry if I try any faster :(
		time.sleep(10)
	f.close()
generateData()