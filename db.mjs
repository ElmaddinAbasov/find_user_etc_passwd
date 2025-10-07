"use strict"

import {Client} from 'pg'

export class database
{
	#defaultArgs = {user : 'gacy', password : 'gacy1996', host : 'localhost', port : 5432, database : 'users'};
	#defaultClient;
	#queries;
	#buildMap()
	{
		this.#queries.set('create', 'CREATE DATABASE ');
		this.#queries.set('check_db_exsistence', 'SELECT datname FROM pg_catalog.pg_database WHERE datname=');
		this.#queries.set('find_user', 'SELECT * FROM my_table WHERE name = ');
	}
	constructor()
	{
                this.#defaultClient = new Client({
                        user: this.#defaultArgs.user,
                        password: this.#defaultArgs.password,
                        host: this.#defaultArgs.host,
                        port: this.#defaultArgs.port,
                        database: this.#defaultArgs.database,
                });
		this.#queries = new Map();
		this.#buildMap();
	}
	async init(name)
	{
		let res;
		try
		{
			await this.#defaultClient.connect();
			res = await this.#defaultClient.query(`SELECT * FROM my_table WHERE name='` + `${name}'`);
			console.log(res.rows);
		}
		catch (error)
		{
			console.error("ERROR: ", error);
		}
		finally
		{
			await this.#defaultClient.end();
		}
	}
};


