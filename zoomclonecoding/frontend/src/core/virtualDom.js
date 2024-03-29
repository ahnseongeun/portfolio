import { Node } from "../types/node";
import { Vdom } from "../types/vdom";

export const VirtualDom = (() => {
  let _oldNode = null;
  
  const render = (node, $parent, index = 0) => {
    updateElement($parent, node, _oldNode, index);
    _oldNode = node;
  };
  const createElement = (node) => {
    if (typeof node === "string" || typeof node === "number") {
      return document.createTextNode(node.toString());
    }
    const $curElement = document.createElement(node.type);
    Object.keys(node.props).forEach((prop) => {
      $curElement.setAttribute(prop, node.props[prop]);
    });
    node.children.forEach((child) => {
      $curElement.appendChild(createElement(child));
    });
    return $curElement;
  };
  const isChanged = (newNode, oldNode) => {
    if (typeof newNode !== typeof oldNode) return true;
    if (typeof newNode !== "object" || typeof oldNode !== "object") {
      return newNode != oldNode;
    }
    if (newNode.type !== oldNode.type) return true;
    return isChangedProps(newNode, oldNode);
  };
  const isChangedProps = (newNode, oldNode) => {
    const newNodePropsKeys = Object.keys(newNode.props);
    const oldNodePropsKeys = Object.keys(oldNode.props);
    const hasAllProps = newNodePropsKeys.reduce((check, key) => {
      if (!check) return false;
      if (newNode.props[key] === oldNode.props[key]) return true;
    }, true);
    if (newNodePropsKeys.length !== oldNodePropsKeys.length) return true;
    if (!hasAllProps) return true;
    return false;
  };
  const updateElement = (
    $parent,
    newNode,
    oldNode,
    index = 0
  ) => {
    if (oldNode === undefined || oldNode === null) {
      $parent.appendChild(createElement(newNode));
    } else if (newNode === undefined || newNode === null) {
      const target = $parent.childNodes[index] || $parent.lastChild;
      $parent.removeChild(target);
    } else if (isChanged(newNode, oldNode)) {
      $parent.replaceChild(createElement(newNode), $parent.childNodes[index]);
    } else if ((newNode).type) {
      const newLength = (newNode).children.length;
      const oldLength = (oldNode).children.length;
      for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement(
          $parent.childNodes[index],
          (newNode).children[i],
          (oldNode).children[i],
          i
        );
      }
    }
  };
  return { render, createElement, updateElement };
})();