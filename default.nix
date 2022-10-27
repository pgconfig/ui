{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name="viz-environment";    
  
  buildInputs = [
    pkgs.nodejs-18_x
    pkgs.yarn
  ];

  shellHook = 
    ''
    echo "local dev environment"
    '';
} 
