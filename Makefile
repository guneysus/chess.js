
default: run

run:
	@npm run start

prod:
	@npm run prod

watch:
	@brunch watch --server --production

live:
	@brunch w --server --production

deploy: prod
	@cd public/ && \
		git add . --all; \
		git commit -m "`date`"; \
		git push
.PHONY: default run prod watch live deploy
