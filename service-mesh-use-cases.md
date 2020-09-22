# Service Mesh Use Cases

## Scenario 1, the simplest one

1. Design `Alpha API` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API`.
3. Develop `service-a` implementing `{get,acme-api,/path-01}` as defined in `Alpha API`.
4. Deploy `service-a`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API`.
6. Develop `client-x`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API`.
7. Deploy `client-x`.

## Scenario 1 properly specifying versions

1. Design version `1.0.0` of `Alpha API` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in version `1.0.0` of `Alpha API`.
3. Develop version `1.0.0` of `service-a` implementing `{get,acme-api,/path-01}` as defined in version `1.0.0` of `Alpha API`.
4. Deploy version `1.0.0` of `service-a`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in version `1.0.0` of `Alpha API`.
6. Develop version `1.0.0` of `client-x`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in version `1.0.0` of `Alpha API`.
7. Deploy version `1.0.0` of `client-x`.

## Scenario 1 properly specifying versions in parenthesis

1. Design `Alpha API (1.0.0)` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
3. Develop `service-a (1.0.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
4. Deploy `service-a (1.0.0)`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
6. Develop `client-x (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
7. Deploy `client-x (1.0.0)`.

## Scenario 2, fix the service

1. Design `Alpha API (1.0.0)` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
3. Develop `service-a (1.0.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
4. Deploy `service-a (1.0.0)`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
6. Develop `client-x (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
7. Deploy `client-x (1.0.0)`.
8. Update `service-a (1.0.1)` still implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
9. Canary Deploy `service-a (1.0.1)`.
10. Remove `service-a (1.0.0)`.
