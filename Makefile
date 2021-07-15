# @see:https://gist.github.com/iriya-ufo/963f30e7ecd4704ad16358e68d34e394

# コンテナ操作コマンド
build:
	@docker-compose build
up:
	@docker-compose up
down:
	@docker-compose down
restart:
	@docker-compose stop
	@docker-compose start
clean:
	@docker system prune

# rails用コマンド
bundle:
	@docker-compose exec web bundle
rails:
	@docker-compose exec web rails
