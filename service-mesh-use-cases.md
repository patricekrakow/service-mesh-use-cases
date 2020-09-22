# Service Mesh Use Cases

## Scenario 1, calling an API endpoint

A consumer service is calling an API endpoint (interface) implemented by a producer service.

### First description

1. Design `Alpha API` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API`.
3. Develop `service-a` implementing `{get,acme-api,/path-01}` as defined in `Alpha API`.
4. Deploy `service-a`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API`.
6. Develop `client-x`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API`.
7. Deploy `client-x`.

### Second description, properly specifying versions

1. Design version `1.0.0` of `Alpha API` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in version `1.0.0` of `Alpha API`.
3. Develop version `1.0.0` of `service-a` implementing `{get,acme-api,/path-01}` as defined in version `1.0.0` of `Alpha API`.
4. Deploy version `1.0.0` of `service-a`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in version `1.0.0` of `Alpha API`.
6. Develop version `1.0.0` of `client-x`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in version `1.0.0` of `Alpha API`.
7. Deploy version `1.0.0` of `client-x`.

_**Warning:**_ Please notice that there are three different version fields above, despite the fact that they all have the same value! You have:

* the version of the API, e.g. the _version `1.0.0` of `Alpha API`_
* the version of the producer service, e.g. the _version `1.0.0` of `service-a`_
* the version of the consumer service, e.g. the _version `1.0.0` of `client-x`_

### Third description, properly specifying versions in parenthesis

1. Design `Alpha API (1.0.0)` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
3. Develop `service-a (1.0.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
4. Deploy `service-a (1.0.0)`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
6. Develop `client-x (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
7. Deploy `client-x (1.0.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are connected to instances of `service-a (1.0.0)`.

## Scenario 2, fix the service

A consumer service is calling an API endpoint implemented by a producer service. Then, the producer service is updated without changing the API endpoint (interface).

1. Design `Alpha API (1.0.0)` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
3. Develop `service-a (1.0.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
4. Deploy `service-a (1.0.0)`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
6. Develop `client-x (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
7. Deploy `client-x (1.0.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are connected to instances of `service-a (1.0.0)`.

8. Update `service-a (1.0.1)` still implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
9. Canary deploy `service-a (1.0.1)` for `{get,acme-api,/path-01}` requests.

For instance only 10% of the request to `{get,acme-api,/path-01}` should be connected to `service-a (1.0.1)`, while the remaining 90% should continue to go to `service-a (1.0.0)`.

10. Remove `service-a (1.0.0)`.

## Scenario 3, add an optional field in the response of an API endpoint (backward compatible change)

1. Design `Alpha API (1.0.0)` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
3. Develop `service-a (1.0.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
4. Deploy `service-a (1.0.0)`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
6. Develop `client-x (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
7. Deploy `client-x (1.0.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are connected to instances of `service-a (1.0.0)`.

8. Update `Alpha API (1.1.0)` by adding an optional field in the response of `{get,acme-api,/path-01}`.
9. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`.
10. Update `service-a (1.1.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`.
11. Canary deploy `service-a (1.1.0)` for `{get,acme-api,/path-01}` requests.

For instance only 10% of the request to `{get,acme-api,/path-01}` should be connected to `service-a (1.1.0)`, while the remaining 90% should continue to go to `service-a (1.0.0)`.

12. Authorize `client-x` to also consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`.
13. Update `client-x (1.1.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`.
14. Deploy `client-x (1.1.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are still connected to instances of `service-a (1.0.0)` (90%) and `service-a (1.1.0)` (10%), **but** the instances of `client-x (1.1.0)` are **exclusively** connected to instances of `service-a (1.1.0)`.

## Scenario 3bis, add an optional field in the response of an API endpoint (backward compatible change)

1. Design `Alpha API (1.0.0)` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
3. Develop `service-a (1.0.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
4. Deploy `service-a (1.0.0)`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
6. Develop `client-x (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
7. Deploy `client-x (1.0.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are connected to instances of `service-a (1.0.0)`.

8. Update `Alpha API (1.1.0)` by adding an optional field in the response of `{get,acme-api,/path-01}`.
9. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`.
10. Update `service-a (1.1.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`.
11. Canary deploy `service-a (1.1.0)` for `{get,acme-api,/path-01}` requests.

For instance only 10% of the request to `{get,acme-api,/path-01}` should be connected to `service-a (1.1.0)`, while the remaining 90% should continue to go to `service-a (1.0.0)`.

12. Authorize `client-y` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`.
13. Develop `client-y (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`.
14. Deploy `client-y (1.0.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are still connected to instances of `service-a (1.0.0)` (90%) and `service-a (1.1.0)` (10%), **but** the instances of `client-y (1.0.0)` are **exclusively** connected to instances of `service-a (1.1.0)`.

## Scenario 4, add an API endpoint to an API (backward compatible change) to be implemented in the same service

1. Design `Alpha API (1.0.0)` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
3. Develop `service-a (1.0.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
4. Deploy `service-a (1.0.0)`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
6. Develop `client-x (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
7. Deploy `client-x (1.0.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are connected to instances of `service-a (1.0.0)`.

8. Update `Alpha API (1.1.0)` by adding `{get,acme-api,/path-02}`.
9. Authorize `service-a` to implement `{get,acme-api,/path-01}` and `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`.
10. Update `service-a (1.1.0)` implementing `{get,acme-api,/path-01}` and `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`.
11. Canary deploy `service-a (1.1.0)` for `{get,acme-api,/path-01}` requests.

For instance only 10% of the request to `{get,acme-api,/path-01}` should be connected to `service-a (1.1.0)`, while the remaining 90% should continue to go to `service-a (1.0.0)`.

12. Authorize `client-x` to also consume `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`.
13. Update `client-x (1.1.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` and `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`.
14. Deploy `client-x (1.1.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are still connected to instances of `service-a (1.0.0)` (90%) and `service-a (1.1.0)` (10%), **but** the instances of `client-x (1.1.0)` are **exclusively** connected to instances of `service-a (1.1.0)`.

## Scenario 5, add an API endpoint to an API (backward compatible change) to be implemented in another service

1. Design `Alpha API (1.0.0)` with `{get,acme-api,/path-01}`.
2. Authorize `service-a` to implement `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
3. Develop `service-a (1.0.0)` implementing `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
4. Deploy `service-a (1.0.0)`.
5. Authorize `client-x` to consume `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
6. Develop `client-x (1.0.0)`, without ANY references to `service-a`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`.
7. Deploy `client-x (1.0.0)`.

Now, the instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are connected to instances of `service-a (1.0.0)`.

8. Update `Alpha API (1.1.0)` by adding `{get,acme-api,/path-02}`.
9. Authorize `service-b` to implement `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`.
10. Develop `service-b (1.0.0)` implementing `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`.
11. Deploy `service-b (1.0.0)`.
12. Authorize `client-x` to also consume `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`.
13. Update `client-x (1.1.0)`, without ANY references to `service-a` nor `service-b`, calling `{get,acme-api,/path-01}` and `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`.
14. Deploy `client-x (1.1.0)`.

The instances of `client-x (1.0.0)`, calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.0.0)`, are connected to instances of `service-a (1.0.0)`. On the other hand, the instances of `client-x (1.1.0)`, when calling `{get,acme-api,/path-01}` as defined in `Alpha API (1.1.0)`, are connected to instances of `service-a (1.0.0)`, while when calling `{get,acme-api,/path-02}` as defined in `Alpha API (1.1.0)`, are connected to instances of `service-a (1.1.0)`.
