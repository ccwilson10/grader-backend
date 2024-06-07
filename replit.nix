{ pkgs }: {
  deps = [
    pkgs.nodejs-20_x
  ];
  env = {
    NODE_ENV = "development";
  };
  entrypoint = "api/analyze.js";
}