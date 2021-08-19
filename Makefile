# コンテナ操作コマンド
init:
	docker-compose build
	docker-compose up -d
rebuild:
	docker-compose down
	docker-compose build
	docker-compose up -d
build:
	docker-compose build
up:
	docker-compose up -d
down:
	docker-compose down
restart:
	docker-compose stop
	docker-compose start
rebuild:
	docker-compose down
	docker-compose build
clean:
	docker system prune

# サービス用コマンド
rails:
	docker-compose exec rails bash
console:
	docker-compose exec rails console
sql:
	docker-compose exec db bash -c 'mysql -u root -ppassword'
react:
	docker-compose exec react sh
restart-react:
	docker-compose stop react
	docker-compose start react