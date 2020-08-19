# Use Cases for Service Mesh

The goal of these use cases is to **test** and **compare** different service mesh implementations.

## UC-1 | Routing of the _API endpoint_ request to the right _service_

### UC-1.1 | Initial situation

Let's have `Alpha API` an _API_ with **two** _API endpoints_:
* `get /path-01`
* `get /path-02`

Let's have `client-x` a _service_ calling these two _API endpoints_.

Let's have `service-a` a _service_ implementing the **two** _API endpoints_ of `Alpha API`. More precisely, let's have the _version_ `1.0.0` of `service-a` implementing these **two** _API endpoints_.

__*WARNING.*__ The `client-x` MUST NOT know the implementation details of the `Alhpa API`, and that includes the _service_ which implements it. So, we will create an additional _network name_ `aplha-api` that will represent _API_.

### UC-1.2 | Let's split the implementation of two _API endpoints_ which belong to the same _API_

Let's have the _version_ `2.0.0` of `service-a` implementing only the first _API endpoint_ &ndash; `get /path-01` &ndash; instead of the two. The increment of the _major version_ of the _service_ denotes a clear backward incompatible change.

Let's have the _version_ `1.0.0` of `service-b` implementing the second _API endpoint_ &ndash; `get /path-02`.

At this stage, we consider that the _API_ has not changed, such changes will be considered in further use cases.