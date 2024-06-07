{ pkgs }: {
  deps = [
    pkgs.nodejs-18_x
  ];
  env = {
    NODE_ENV = "development";
  };
  entrypoint = "api/analyze.js";
}