import path from 'path';
import * as fs from "node:fs";

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: {
          rejectUnauthorized: true,
          ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIURzzrE+8Z81/id1LP+YWhgWjyAhowDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1YWVmYjhlYjAtNGJmNC00NzVmLWE5NzMtNzZlZDkyY2Rj
NTg0IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwOTIzMDgzNDI1WhcNMzUwOTIxMDgz
NDI1WjBAMT4wPAYDVQQDDDVhZWZiOGViMC00YmY0LTQ3NWYtYTk3My03NmVkOTJj
ZGM1ODQgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAPX0DEYdfS1KbHVbRumxEhsFedNIbrlIaticEiZ5oRFluDeoVHyrTtwb
6M4Di89wy668/qs9MnBbcLhliTj8DucK7KXru+y49QkDhj9FC9pj6a3uQ0SNrVI+
v2D/5HDpdAVx3OYr61LPKyNhl8GxBg6I7EiiBPWSTjKlm951UdxWyKQFtMnL6lvi
7LYH3KlKXD1oLaxcqoyO2B235ZyBszTs4bCUDRKPmgQGJTQPUaJv6fJ7YtJw+5Qy
LBCkL7Vp+UQO4uz0SVYz3jnzijcyIT/qS7nBqgHnEaPgjfECXUoE9xfjxx4Rppe3
kgTu/fPkWwOwTSobTHI7+vcrCdix2uEl00gFFsn1iKAK+p4Fb9Ddvqo0fkppo6iz
YBO1HOLwKioxMczx6iTmEunrkWjcULJsy4PIJI/EnyHE0/Hu5QK76rXf7wNBqm17
IOmITkzKHwTfmIqMlW6ujJUBG4vmpfemlW/FiAU770o11qeJGjXOe/DX4W7IsBf1
RLXuEjMBZwIDAQABo0IwQDAdBgNVHQ4EFgQUjwKPtTOKh0zNFlSuNMlrWc+TnREw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBAOkvP9X3t8hbshABnGb/zCQwgnNSpJoQfYwkVhopkkb6e01VllCLVW+ivY3I
Y4Ezmm5+O4eGeA+y2fylJfOWZg5t3dvn9VCqXP/X9oGiksJG0rhd7nQB0O0H5JCP
BtOfXvWbFe3oiC9kLnmsWhnUIBRfuvDwzbb94l8Y5ea5gkIPOQ7OI6c2Nvypzw4x
D/UGrG/1HDSlYT0+OfZCNRK86JBo8m3bK4WsB9C3bF4LDDXpttut4lRjXzELe7CO
zP0zUgvacOQPQtlVsRDXyJiivX2e6uxP5uHMyW71RflxAUTkzTBf/iPafH6jwKxU
1SvC0/5+DzvbEGcGbhWFZgOUE/9jIIs+kBHeANLYow8M7LGvmbQfny8ZxcCDnlGo
AvkBrPpbQpHD3v1RnxnI4PlmYPi9IW3fU70WaOi58RU/ZjzXqqpCZtxkgtyuKpOl
FLcvDNiPg25KomCT9to18LmDJaEpRZDutVkkbBOsqGaLU2D/sq4OowSODHyRnQnO
niuAeA==
-----END CERTIFICATE-----
`,
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
