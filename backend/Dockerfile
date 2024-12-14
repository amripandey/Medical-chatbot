FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

EXPOSE 9000

CMD ["fastapi", "run", "app/main.py", "--port", "9000"]


# I am getting error
# failed to solve: process "/bin/sh -c pip install --no-cache-dir --upgrade -r requirements.txt" did not complete successfully: exit code: 1
# it is due to dependency conflict during pip install but, I am not planing to do any things for now.