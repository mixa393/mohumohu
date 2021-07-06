
FIG = docker-compose
APP = $(FIG) exec web
RAILS = $(APP) rails

# コンテナ操作コマンド等
build:
	@$(FIG) build
up:
	@$(FIG) up
down:
	@$(FIG) down
restart:
	@$(FIG) stop
	@$(FIG) start
clean:
	@docker system prune

# bundle install コマンド
bi:
	@$(APP) bundle install
br:
	@$(APP) gem uninstall -aIx
	@make bi

# rails コマンド
rc:
	@$(RAILS) console
rr:
	@$(RAILS) routes
rt:
	@$(RAILS) test

# db コマンド
dbc:
	@$(RAILS) db:create
dbm:
	@$(RAILS) db:migrate
dbs:
	@$(RAILS) db:seed