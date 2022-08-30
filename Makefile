PORT=3005
PROJECT=react-demo


scrap:
	ts-node src/index.ts

serve:
	npx http-server -p $(PORT) ./output/$(PROJECT)