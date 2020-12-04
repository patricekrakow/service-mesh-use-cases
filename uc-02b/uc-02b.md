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

```text
$ kubectl get pods -n demo-uc-02b
NAME                                                  READY   STATUS    RESTARTS   AGE
client-x-version-1-0-0-deployment-59db69bf76-w4ktv    1/1     Running   0          3m37s
service-a-version-1-0-0-deployment-64f79cf6db-xjwgz   1/1     Running   0          11m
service-b-version-1-0-0-deployment-bd96bb759-xpdm2    1/1     Running   0          11m
```

```text
kubectl logs client-x-version-1-0-0-deployment-59db69bf76-w4ktv -n demo-uc-02b | tail
[INFO] get /path-01 | Hello from get /path-01! | service-a (1.0.0) | service-a-version-1-0-0-deployment-64f79cf6db-xjwgz
[INFO] get /path-02 | Hello from get /path-02! | service-b (1.0.0) | service-b-version-1-0-0-deployment-bd96bb759-xpdm2
[INFO] get /path-01 | 404
[INFO] get /path-02 | Hello from get /path-02! | service-b (1.0.0) | service-b-version-1-0-0-deployment-bd96bb759-xpdm2
[INFO] get /path-01 | 404
[INFO] get /path-02 | 404
[INFO] get /path-01 | 404
[INFO] get /path-02 | Hello from get /path-02! | service-b (1.0.0) | service-b-version-1-0-0-deployment-bd96bb759-xpdm2
[INFO] get /path-01 | Hello from get /path-01! | service-a (1.0.0) | service-a-version-1-0-0-deployment-64f79cf6db-xjwgz
[INFO] get /path-02 | 404
```

### OSM

```text
$ osm namespace add demo-uc-02b
Namespace [demo-uc-02b] successfully added to mesh [osm]
```

```text
kubectl get pods -n demo-uc-02b
NAME                                                  READY   STATUS    RESTARTS   AGE
client-x-version-1-0-0-deployment-59db69bf76-w4ktv    1/1     Running   0          12m
service-a-version-1-0-0-deployment-64f79cf6db-xjwgz   1/1     Running   0          20m
service-b-version-1-0-0-deployment-bd96bb759-xpdm2    1/1     Running   0          20m
```

```text
kubectl delete pods --all -n demo-uc-02b                                        
pod "client-x-version-1-0-0-deployment-59db69bf76-w4ktv" deleted
pod "service-a-version-1-0-0-deployment-64f79cf6db-xjwgz" deleted
pod "service-b-version-1-0-0-deployment-bd96bb759-xpdm2" deleted
```

```text
kubectl get pods -n demo-uc-02b                                           
NAME                                                  READY   STATUS    RESTARTS   AGE
client-x-version-1-0-0-deployment-59db69bf76-2fkbl    2/2     Running   0          71s
service-a-version-1-0-0-deployment-64f79cf6db-v2q7r   2/2     Running   0          71s
service-b-version-1-0-0-deployment-bd96bb759-5kj8w    2/2     Running   0          71s
```

```text
kubectl logs client-x-version-1-0-0-deployment-59db69bf76-2fkbl client-x -n demo-uc-02b | tail
[INFO] get /path-01 | 000
[INFO] get /path-02 | 000
[INFO] get /path-01 | 000
[INFO] get /path-02 | 000
[INFO] get /path-01 | 000
[INFO] get /path-02 | 000
[INFO] get /path-01 | 000
[INFO] get /path-02 | 000
[INFO] get /path-01 | 000
[INFO] get /path-02 | 000
```

### Istio
