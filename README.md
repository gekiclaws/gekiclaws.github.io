<b>Welcome to my personal portfolio!</b>

Run ```python3 -m http.server``` to deploy locally.

<b>To run PMD static analyzer:</b>

Install PMD:
```
cd $HOME
curl -OL https://github.com/pmd/pmd/releases/download/pmd_releases%2F7.8.0/pmd-dist-7.8.0-bin.zip
unzip pmd-dist-7.8.0-bin.zip
alias pmd="$HOME/pmd-bin-7.8.0/bin/pmd"
```

Run PMD:
```
pmd check -f text -R .github/rulesets/html.xml -d ./
pmd check -f text -R .github/rulesets/js.xml -d ./
```