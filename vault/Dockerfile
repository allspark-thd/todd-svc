FROM cgswong/vault:0.5.0
ADD vault.conf /root/vault.conf
ENTRYPOINT [ "/usr/local/bin/vault", "server", "-config", "/root/vault.conf" ]

