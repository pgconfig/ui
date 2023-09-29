{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name="viz-environment";    
  
  buildInputs = [
    pkgs.bun
  ];

  shellHook = 
    ''
    echo "local dev environment"
    '';
} 
