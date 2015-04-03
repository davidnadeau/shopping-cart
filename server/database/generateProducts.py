import json
import os
import requests
import decimal
import random
import codecs
import time
import sys
from StringIO import StringIO

# Generate a random price between i and j.
def randomPrice(i, j):
	return str(decimal.Decimal('%d.%d' % (random.randint(i,j),random.randint(0,99))))

# Create the insert statements to quickly load product database.
def buildSQL(movieTitle, imagePath):
	return "INSERT INTO products (name, price, image_path) VALUES (\""+ movieTitle+"\", "+randomPrice(5,50)+", \""+imagePath+"\");\n"

def update_progress(i, end_val, bar_length=30):
        percent = float(i) / end_val
        hashes = '#' * int(round(percent * bar_length))
        spaces = ' ' * (bar_length - len(hashes))
        sys.stdout.write("\rPercent: [{0}] {1}%".format(hashes + spaces, int(round(percent * 100))))
        sys.stdout.flush()

# Read all the movies in movies.txt.
# Get a path to the first image returned from google images.
# Store to insert statements in movies.sql.
def generateData():
	# sites preventing hotlinking images
	blacklist = ['www.imdb.com','ia.media-imdb.com','topmoviecenters.com']

	BASE_URL = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='
	movieTitles = [movieTitle.strip() for movieTitle in codecs.open('movies.txt','r','iso-8859-1')]
	f = codecs.open('movies.sql','w','iso-8859-1')
	progress = 0
	for movieTitle in movieTitles:
		update_progress(progress, len(movieTitles))
		progress += 1

		r = requests.get(BASE_URL+movieTitle)
		res = json.loads(r.text)['responseData']
		if res is not None:
			for i in range(0, len(res['results'])):
				# if the image is on a blacklisted server, skip
				if res['results'][i]['visibleUrl'] in blacklist:
					continue
				else:
					# found a server that isn't on the blacklist
					imagePath = res['results'][i]['unescapedUrl']
					break
			if imagePath is None:
				imagePath = 'http://www.sitindia.com/res/img/img-not-found.png'
		else:
			imagePath = 'http://www.sitindia.com/res/img/img-not-found.png'

		f.write(buildSQL(movieTitle, imagePath))
		# google gets angry if I try any faster :(
		time.sleep(10)

	f.close()

generateData()
