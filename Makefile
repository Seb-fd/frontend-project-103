install:
	npm install

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm test