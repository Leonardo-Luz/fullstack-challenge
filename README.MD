## Library

## Framework

file-loader 
    used to import png or any type into ts scripts

Sequelize
    create db models and CRUD

dotenv
    load envirment variables

pg 
    Acessar postgres BD

typescript -D

@types/{ pg , express } -D
    tipagem 
    
--
Express // Mudar para NextJS
    framework
    create rest api 

nodemon
    dependencia para teste, roda a aplicação "ao vivo", qualquer mudança no código é atualizado na hora

ts-node
    Executa a aplicação em ts ao invez de buildar para js e entao executar


timestamp update
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON todos
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

credits
<a href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by Freepik - Flaticon</a>
