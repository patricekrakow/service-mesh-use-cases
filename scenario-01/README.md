# Scenario 1

## Prerequisite(s)

You must have a running _Kubernetes_ cluster, and an access to it via the `kubectl` CLI. You can follow one of these documents to get a proper environment:

* [Playing with Minikube](https://github.com/patricekrakow/learning-stuff/blob/master/playing-with-Minikube.md)
* [Playing with Azure Kubernetes Service (AKS)](https://github.com/patricekrakow/learning-stuff/blob/master/playing-with-AKS.md)

```text
$ kubectl version --short
Client Version: v1.18.8
Server Version: v1.17.11
```

## Install the OSM CLI

1\. Download platform specific compressed package from the [Releases page](https://github.com/openservicemesh/osm/releases):

```text
$ wget https://github.com/openservicemesh/osm/releases/download/v0.3.0/osm-v0.3.0-linux-amd64.tar.gz
...
2020-08-13 18:54:07 (18.3 MB/s) - ‘osm-v0.3.0-linux-amd64.tar.gz’ saved [22543737/22543737]
```

2\. Unpack the `osm` binary:

```text
$ tar -xzf osm-v0.3.0-linux-amd64.tar.gz
$ cd linux-amd64/
$ ls
LICENSE  osm  README.md
```

3\. Add the OSM CLI to the `$PATH`:

```text
$ export PATH="$HOME/linux-amd64:$PATH"
$ osm version
Version: v0.3.0; Commit: c91c782; Date: 2020-08-12-21:49
```

## Install OSM

1\. Install the OSM control plane on to the Kubernetes cluster:

```text
$ osm install
OSM installed successfully in namespace [osm-system] with mesh name [osm]
```

2\. Verify the installation of OSM:

```text
$ kubectl get pods --namespace osm-system
NAME                             READY   STATUS    RESTARTS   AGE
osm-controller-5778756dd-4tq88   1/1     Running   0          43s
osm-grafana-775c79f77-6d6x9      1/1     Running   0          43s
osm-prometheus-d54f6f8b7-m6g4f   1/1     Running   0          43s
zipkin-5dbc54795f-pnbmm          1/1     Running   0          43s
```

## Install the Scenario

### Without a Mesh

### With a Mesh