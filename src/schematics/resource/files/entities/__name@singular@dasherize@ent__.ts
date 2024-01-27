<% if (orm == 'typeorm') { %>import { Entity } from 'typeorm'
<% } %>
@Entity('<%= underscore(plural(name)) %>')
export class <%= classify(singular(name)) %>Entity {}