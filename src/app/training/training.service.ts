import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];
  private runningExercise: Exercise;
  private completedExercises: Exercise[] = [];

  getTrainings() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    console.log(selectedId);
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.completedExercises.push({...this.runningExercise, date: new Date(), state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log(JSON.stringify(this.completedExercises));
  }

  cancelExercise(progress: number) {
    this.completedExercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log(JSON.stringify(this.completedExercises));
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }
}
