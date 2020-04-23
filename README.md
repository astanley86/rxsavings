# RX Savings Solutions
> Interview code challenge

A quick and simple Node Express and ArangoDB application that runs with Docker.

### Initial Setup
This application requires **docker** and **docker-compose** to be installed on your machine.  If you do not already have Docker installed, you can find the download instructions here: <https://www.docker.com/products/docker-desktop> and docker-compose here: <https://docs.docker.com/compose/install/>

### Running the Application
1. Clone this repo
```sh
git clone https://github.com/astanley86/rxsavings.git
```
2. Rename .env.Example to .env (Feel free to change the values)
3. Using a terminal command line, navigate to the project's root directory and run `docker-compose up`
4. Open up a web browser to <http://localhost:7042/?lat=38.862034&long=-94.685221> and replace the values after lat= and long= with valid latitude and longitude cooridinates.

### Features
The *lat* and *long* query parameters are required and must be valid numbers.
Endpoint is a GET request that returns a JSON object in the following format:
```
{
  "pharmacy": "CVS PHARMACY",
  "miles_distance": 2.604613276218439,
  "address": {
    "address": "5001 WEST 135 ST",
    "city": "LEAWOOD",
    "state": "KS",
    "zip": 66224
  }
}
```


### Help and Support
Please do not hesitate to contact me if you run into any problems with Docker, running the application, or if you expected to see something different.  Thank you for your time and consideration.