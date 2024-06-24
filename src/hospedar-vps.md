# PASSOS PARA HOSPEDAR SITE EM UMA VPS

# INSTALAR NA VPS
    # npm : gerenciador de pacote
    # node 
    # nginx : servidor web :
        - sudo apt install nginx
    # configurar firewall
    ## habilitar a porta que será usada
        - sudo ufw status
        - sudo ufw allow OpenSSH
        - sudo ufw enable
        - sudo ufw allow "Nginx HTTPS"
        - sudo ufw delete allow "Nginx Full"
        - sudo ufw app list
        - sudo ufw allow porta/protocolo ex: sudo ufw allow 5050/tcp

# FAZER O CLONE DO GITHUB PARA O SERVIDOR

    # verifique se existe uma chave SSH ed25519
    ## crie uma chave ssh 25519 no servidor
        - ssh-keygen -t ed25519 -C "your_email@example.com"
    ## Rodar o ssh-agent
        - eval $(ssh-agent -s)
    ## Incluir a chave privada
        - ssh-add ~/.ssh/id_ed25519
    ## Copiar chave pública
        - cat ~/.ssh/id_ed25519.pub

    # adicione a chave SSH no Github
    
    # git clone "url"

# INSTALAR NO PROJETO
    # next : pacotes do next necessario
        - npm i next
    # sharp : pacote para otimizar imagem
        - npm i sharp
    # pm2 : recurso para manter o sv node rodando
        - sudo npm i pm2 -g
        
    # npm run build
    # pm2 start npm --name "name" -- start --watch
