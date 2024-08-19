/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./TodoList.module.css";
import TaskItem from "./TaskItem";

const TodoList = () => {
  const tasks = [
    { id: 1, text: "Tarea 1" },
    { id: 2, text: "Tarea 2" },
  ];

  return (
    <main className={styles.container}>
      <section className={styles.taskList}>
        <h1 className={styles.title}>Lista De Tareas</h1>
        {tasks.map((task) => (
          <TaskItem key={task.id} text={task.text} />
        ))}
        <div className={styles.inputContainer} />
        <button className={styles.addButton}>agregar</button>
      </section>
    </main>
  );
};

export default TodoList;
