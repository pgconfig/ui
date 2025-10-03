{ pkgs, lib, config, inputs, ... }:
{
  packages = [
    pkgs.git
    pkgs.bun
  ];

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
    yarn.enable = true;
  };

  scripts.install.exec = "yarn install";
  scripts.dev.exec = "yarn serve";

  enterShell = ''
    echo "Run 'devenv install' to install dependencies."
    echo "Run 'devenv dev' to start the development server."
  '';

  cachix.enable = false;
}