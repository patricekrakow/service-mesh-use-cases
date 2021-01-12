# Routing of _API endpoint_ request to right _services_

## Split of the implementation of an (unchanged) API

Let's have `Alpha API` an _API_ with **two** _API endpoints_:

* `get /path-01`
* `get /path-02`

Let's have `client-x` a _service_ calling these two _API endpoints_.

Let's have `service-a` a _service_ implementing the **two** _API endpoints_ of `Alpha API`. More precisely, let's have the _version_ `1.0.0` of `service-a` implementing these **two** _API endpoints_.

According to the interface principle, the `client-x` MUST NOT know the implementation details of the `Alpha API`. So, it MUST NOT know which _service_ implements the _API endpoint_ it is calling. Therefore, the `service-a` network name cannot be used as configuration by the `client-x`. We will then introduce a new network name `alpha-api` allowing the `client-x` to call the `service-a`.

When the same _service_ implements all the _API endpoints_ of an _API_, this extra network name may seem unnecessary. But, imagine that we suddenly want to implement the second _API endpoint_ `get /path-02` within another _service_ `service-b`. We should be able to do such a change *without* asking the client `client-x` to do anything. In this situation, when the _API endpoints_ of an _API_ are implemented by different _services_, it is necessary to have this extra network name representing the API independently of its implementation.

So, we now still have `Alpha API` an _API_ with **two** _API endpoints_:

* `get /path-01`
* `get /path-02`

We can still have the version `1.0.0` of `service-a` implementing these **two** _API endpoints_, but also the version `1.0.0` of the `service-b` implementing only the **second** _API endpoint_ `get /path-02` of the `Alpha API`. Later, we can introduce the version `2.0.0` of the `service-a` implementing only the *first** _API endpoint_ `get /path-01` in order to decommission the version `1.0.0` of the `service-a`.

> In the scenario, we have only introduced a version for the _service_ (implementation). Later, we will also introduce an **additional** version being the version of the _API_ (interface) in order to manage changes within the interface. In this first scenario, we are only considering change of the implementation without any changes of the interface.

### Step 1 - Initial Situation

We start with the following Kubernetes configuration:

```yaml
# File: routing.step-01.k8s.yaml
```

Let's not forget to label the `routing-demo` namespace so the pods automatically an Istio (Envoy) proxy injected as a sidecar:

```text
$ kubectl label namespace routing-demo istio-injection=enabled
namespace/routing-demo labeled
```

Let's apply it:

```text
$ kubectl apply -f routing.step-01.k8s.yaml
...
```

Let's just add the version `1.0.0` of `service-b`:

```text
$ kubectl apply -f routing.step-02.k8s.yaml
...
```
