
default: serve sync
	
serve:
	@brunch w --server&

sync:
	@browser-sync start --proxy "http://0.0.0.0:3333" --files "public/*.*"&

.PHONY: serve sync