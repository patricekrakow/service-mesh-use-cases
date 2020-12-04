# UC-02b | Implementing one API with two API endpoints with two services

## UC-02b.01 | Initial situation

Let's have `Alpha API` an _API_ with **two** _API endpoints_:

* `get /path-01`
* `get /path-02`

Let's have `client-x` a _service_ calling these two _API endpoints_.

Let's have `service-a` a _service_ implementing the *one* _API endpoints_ - `get /path-01` - of `Alpha API`.

Let's have `service-b` a _service_ implementing the *one* _API endpoints_ - `get /path-02` - of `Alpha API`.

> __*REQUIREMENT.*__ The `client-x` MUST NOT know the implementation details of the `Alhpa API`, and that includes the _services_ which implements it.
>
>So, we SHOULD add an additional _network name_ like `aplha-api` that would represent the _API_. However, if we make sure that the _API endpoints_ such as `get /path-01` and `get /path-02` are distinct, we can have only one unique network name such as `acme-api`. However, if, and only if, we would have a collision about two or more different _API endpoints_ having the same name, then, and only then, we can still use a different network name such as `<differentiator>.acme-api`.

### Demo Configuration

The Kubernetes manifests of the above situation can be written as follow:
