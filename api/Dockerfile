FROM continuumio/miniconda3

WORKDIR /api

COPY . .

ARG CONDA_ENV_NAME
ENV CONDA_ENV_NAME=${CONDA_ENV_NAME}

RUN conda env create --name ${CONDA_ENV_NAME} -f environment.yml
RUN chmod +x entrypoint.sh

EXPOSE 8000

ENTRYPOINT  ["./entrypoint.sh"]