# SDE Online Assessment

## Getting Started

### Running the project with docker

* Make sure Docker is installed on your system.

* Run the following command to build an image.
```
docker build -t sde-test .
```
* Run the following command to run the image where `sample_input.json` and `sample_output.json` are input and output file paths respectively.

```
docker run sde-test sample_input.json sample_output.json
```

### Running the project locally

The project can be run as a command line tool using the following list of commands.

```
npm i -g

sde-cli sample_input.json ./sample-output.json
```

