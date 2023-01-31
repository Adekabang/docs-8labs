---
title: Configuration Caddy
sidebar_position: 2
---

# Configuration Caddy

Sample Configuration for Caddy as Web server. You can choose one that fit your condition

## Reverse Proxy
Configuration for Caddy as a Reverse Proxy

### Simple Config for Reverse Proxy

Reverse Proxy for pointing the Web Server to Web Application Server IP and Bind the domain

```bash title="/etc/caddy/Caddyfile"
ksara.xyz {
        reverse_proxy http://localhost:3000
}
```

### Advanced Config for Reverse Proxy
The Advanced configuration to add X-Forwarded, Log Output and other else

```bash title="/etc/caddy/Caddyfile"
ksara.xyz {
        reverse_proxy http://localhost:3000 {
                header_up X-Forwarded-Proto https
                header_up X-Url-Scheme {scheme}
                header_up X-Real-IP {remote}
        }
        file_server
        encode gzip zstd
        log {
                output file /var/log/caddy/access-ksara.xyz.log
                format json
        }
        @static { 
                file path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.svg *.woff *.pdf *.webp
        }
        header @static Cache-Control max-age=5184000
}
```

## Virtual Host
Configuration for Caddy as a Virtual Host

### Config for Static Web

Web Server to Static Web Directory

```bash title="/etc/caddy/Caddyfile"
ksara.xyz { 
        root * /var/www/html/ksara.xyz
        file_server
        encode gzip zstd
        @static { 
                file path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.svg *.woff *.pdf *.webp
        }
        header @static Cache-Control max-age=5184000
}
```

### Config for PHP Web

Web Server to PHP Web Directory

Install additional module to execute PHP
```bash
sudo dnf install php-fpm php-cli php-gd -y
```

Configuration File Sample
```bash title="/etc/caddy/Caddyfile"
ksara.xyz { 
        root * /var/www/html/ksara.xyz
        file_server
        encode gzip zstd
        php_fascgi unix//run/php-fpm/www.sock
}
```

Edit PHP-FPM Config File and edit some line
```bash title="/etc/php-fpm.d/www.conf"
user = caddy
group = caddy
listen.acl_users = apache,nginx,caddy
```

Restart PHP-FPM Services
```bash
systemctl start php-fpm
systemctl enable --now php-fpm
```


## Validate & Format Caddy Config
To Validate and Format Caddy configuration

```bash
caddy validate --adapter caddyfile --config /etc/caddy/Caddyfile
caddy fmt --overwrite /etc/caddy/Caddyfile
```

Restart the Caddy Service
```bash
sudo systemctl restart caddy
```
