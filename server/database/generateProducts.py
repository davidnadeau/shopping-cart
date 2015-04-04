import json
import os
import requests
import decimal
import random
import codecs
import time
import sys
import string
from PIL import Image
from StringIO import StringIO

# Generate a random price between i and j.
def randomPrice(i, j):
	return str(decimal.Decimal('%d.%d' % (random.randint(i,j),random.randint(0,99))))

# generate a random string [a-zA-Z0-9] of length n
def randomString(length, chars=string.ascii_uppercase + string.digits):
	return ''.join(random.choice(chars) for _ in range(length))

# Create the insert statements to quickly load product database.
def buildSQL(movieTitle, fileName):
	return "INSERT INTO products (name, price, image_path) VALUES (\""+ movieTitle+"\", "+randomPrice(5,50)+", \""+fileName+"\");\n"

def update_progress(i, end_val, bar_length=30):
        percent = float(i) / end_val
        hashes = '#' * int(round(percent * bar_length))
        spaces = ' ' * (bar_length - len(hashes))
        sys.stdout.write("\rPercent: [{0}] {1}%".format(hashes + spaces, int(round(percent * 100))))
        sys.stdout.flush()

# supported image formats
def parseImageType(imageType):
	return {
		'jpeg': 'JPEG',
		'jpg': 'JPEG',
		'png': 'PNG',
		'gif': 'GIF',
		'bmp': 'BMP'
	}.get(imageType, -1)

def saveImage(path, url):
	size = 512, 512
	fileName = randomString(16)
	try:
		imageData = requests.get(url)
	except requests.ConnectionError, e:
		saveImage(path,url)

	imageType = url.split('.')[-1]
	extension = '.'+imageType

	image = open(os.path.join(path,fileName+extension),'w')
	try:
		movieImage = Image.open(StringIO(imageData.content))
		movieImage.thumbnail(size, Image.ANTIALIAS)
		movieImage.save(image, parseImageType(imageType))
	except IOError, e:
		print 'could not save %s' % url
	finally:
		image.close()
	return fileName+extension

# Read all the movies in movies.txt.
# Get a path to the first image returned from google images.
# Store to insert statements in movies.sql.
def generateData():
	BASE_PATH = 'images'
	os.makedirs(BASE_PATH)
	# sites preventing hotlinking images
	blacklist = ['www.imdb.com','ia.media-imdb.com','topmoviecenters.com','www.viz4u.net','forum.indowebster.com']

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
				print(res['results'][i]['visibleUrl'])
				# if the image is on a blacklisted server, skip
				if res['results'][i]['visibleUrl'] in blacklist:
					continue
				else:
					url = res['results'][i]['unescapedUrl']
					# ensure an extesion is in supported list
					extension = url.split('.')[-1]
					if parseImageType(extension) == -1: 
						continue
					# found a server that isn't on the blacklist
					imagePath = url
					break

		if imagePath is None:
			fileName = 'img-not-found.png'
		else:
			fileName = saveImage(BASE_PATH,imagePath)

		f.write(buildSQL(movieTitle, fileName))
		# google gets angry if we download any faster
		time.sleep(1.5)

	f.close()

generateData()
