# **siscoaf-xml-builder-2-for-register**

Construa XML para o SISCOAF a partir do Escriba Register

## **O que é?**

Uma ferramenta simples para coletar informações de protocolos do software Escriba Register e gerar um lote XML compatível com o SISCOAF.

## **Para quem é?**

Para cartórios que utilizam o Escriba Register e ainda não tem outra forma de gerar os comunicados para o SISCOAF senão pela interface do próprio SISCOAF, ou que estão insatisfeitos com os sistemas que estão utilizando.

## **Por que?**

Quando o desenvolvimento deste aplicativo foi iniciado, a Escriba, desenvolvedora do software Register, não havia disponibilizado qualquer ferramenta para facilitar a comunicação com o SISCOAF em seus sistemas.

Finalmente uma ferramenta foi disponibilizada dentro do register, todavia, até o momento, essa ferramenta somente permite fazer os comunicados caso o registro relacionado seja finalizado.

Essa limitação faz com que vários comunicados de suspeitas de fraudes não possam ser produzidos pela própria ferramenta da Escriba, fazendo com que os usuários voltem a ter que gerar a comunicação por outros meios.

O `SISCOAF XML BUILDER` existe para atuar nessa lacuna deixada pela Escriba, possibilitando aos usuários a criação de um lote XML de comunicação a partir das informações existentes em qualquer protocolo do Register.

## **Quais as limitações?**

O `SISCOAF XML BUILDER` buscará no Register o protocolo informado pelo usuário e retornará um XML contendo:

- a data e o valor da escritura (se) informada na recepção do registro;
- a lista das partes (pessoas) relacionadas no protocolo (nome e CPF/CNPJ).

Somente!

Além disso, este aplicativo somente gera XML de **comunicação** ao SISCOAF! Retificações e outros estão fora do escopo, no momento.

## Colaboradores

- André Martins
