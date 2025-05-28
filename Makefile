DEV_CONTAINER=dev
PREVIEW_CONTAINER=preview

.PHONY: dev build preview lint format test up down deploy logs ssh

dev:
	docker compose up -d $(DEV_CONTAINER)

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose exec $(DEV_CONTAINER) npm run build

preview:
	docker compose up -d $(PREVIEW_CONTAINER)

lint:
	docker compose exec $(DEV_CONTAINER) npx eslint .

format:
	docker compose exec $(DEV_CONTAINER) npx prettier --write .

test:
	docker compose exec $(DEV_CONTAINER) sh -c "echo '(テストコマンドをここに追加)'"

logs:
	docker compose logs -f $(DEV_CONTAINER)

ssh:
	docker compose exec $(DEV_CONTAINER) sh
