// https://juejin.im/post/594dfe795188250d725a220a

class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {

    constructor() {
        this.root = null
    }

    insert(key) {
        const newNode = new Node(key)
        const insertNode = (node, newNode) => {
            if (newNode.key < node.key) {
                if (node.left === null) {
                    node.left = newNode
                } else {
                    insertNode(node.left, newNode)
                }
            } else {
                if (node.right === null) {
                    node.right = newNode
                } else {
                    insertNode(node.right, newNode)
                }
            }
        }
        if (!this.root) {
            this.root = newNode
        } else {
            insertNode(this.root, newNode)
        }
    }
    // 中序遍历
    inOrderTraverse(callback) {
        const inOrderTraverseNode = (node, callback) => {
            if (node !== null) {
                inOrderTraverseNode(node.left, callback)
                callback(node.key)
                inOrderTraverseNode(node.right, callback)
            }
        }
        inOrderTraverseNode(this.root, callback)
    }
    // 前序遍历
    preOrderTraverse(callback) {
        const preOrderTraverseNode = (node, callback) => {
            if (node !== null) {
                callback(node.key)
                preOrderTraverseNode(node.left, callback)
                preOrderTraverseNode(node.right, callback)
            }
        }
        preOrderTraverseNode(this.root, callback)
    }
    // 后序遍历
    postOrderTraverse(callback) {
        const postOrderTraverseNode = (node, callback) => {
            if (node !== null) {
                postOrderTraverseNode(node.left, callback)
                postOrderTraverseNode(node.right, callback)
                callback(node.key)
            }
        }
        postOrderTraverseNode(this.root, callback)
    }

    min(node) {
        const minNode = node => {
            return node ? (node.left ? minNode(node.left) : node) : null
        }
        const minNodeWhile = node => {
            if (node) {
                while (node && node.left !== null) {
                    node = node.left
                }
                return node.key
            }
            return null
        }
        return minNode(node || this.root)
        // return minNodeWhile(node || this.root)
    }

    max(node) {
        const maxNode = node => {
            return node ? (node.right ? maxNode(node.right) : node) : null
        }
        const maxNodeWhile = node => {
            if (node) {
                while (node && node.right !== null) {
                    node = node.right
                }
                return node.key
            }
            return null
        }
        return maxNode(node || this.root)
        // return maxNodeWhile(node || this.root)
    }

    search(key) {
        const searchNode = (node, key) => {
            if (node === null) return null
            if (node.key === key) return node
            return searchNode((key < node.key) ? node.left : node.right, key)
        }
        return searchNode(root, key)
    }

    remove(key, node) {
        var findMinNode = function (node) {
            while (node && node.left !== null) {
                node = node.left
            }
            return node
        }
        var removeNode = function(node, key) {
            if (node === null) return null;
            if (key < node.key) {
                node.left = removeNode(node.left, key);
                return node;
            } else if (key > node.key) {
                node.right = removeNode(node.right, key);
                return node;
            } else {
                // 当前节点没有左右子节点，直接删除
                if (node.left === null && node.right === null) {
                    node = null;
                    return node;
                }
                if (node.left === null) {
                    // 如果只有右节点，直接用右节点替换
                    node = node.right;
                    return node;
                } else if (node.right === null) {
                    // 如果只有左节点，直接用左节点替换
                    node = node.left;
                    return node;
                }
                // 如果左右节点都有，先找到右节点中的最小值
                var aux = findMinNode(node.right);
                // 用最小值替换当前节点
                node.key = aux.key;
                // 然后删除最小值的节点
                node.right = removeNode(node.right, aux.key);
                return node;
            }
        };
        this.root = removeNode(node || this.root, key);
    }
}