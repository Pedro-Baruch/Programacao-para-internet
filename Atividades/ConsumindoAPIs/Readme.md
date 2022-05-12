# Consumindo APIs

## Anonfiles

Software feito para fazer o upload de arquivos de forma anonima e gratuita, com um limite de 20gb de arquivo que podem ser enviados de uma só vez. <br>

link: https://anonfiles.com/

#### Como foi utilizado:

POST https://api.anonfiles.com/upload (Fazer upload de um arquivos)<br>
GET https://api.anonfiles.com/v2/file/{id}/info (Chamar o arquivo criado) <br>

## Bible-api

Essa web api é focada em entregar versos e passagens da biblia em arquivos JSON. <br>

link do github: https://github.com/seven1m/bible_api

#### Como foi utilizado:

GET https://bible-api.com/john 3:16 (Chamar o versiculo)<br>
GET https://bible-api.com/john 3:16?translation=almeida (Chamar com tradução para português) <br>
GET https://bible-api.com/john 3:16?verse_numbers=true (Chamar com o números do verso)<br>
GET https://bible-api.com/john+3:16?callback=func (Chamar em formato de função) <br>
