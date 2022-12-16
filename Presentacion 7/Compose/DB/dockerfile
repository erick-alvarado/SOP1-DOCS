#Create MySQL Image for JSP Tutorial Application
FROM mysql

ENV MYSQL_ROOT_PASSWORD root
ENV MYSQL_DATABASE db
COPY ./database_users.sql /docker-entrypoint-initdb.d/
EXPOSE 3306