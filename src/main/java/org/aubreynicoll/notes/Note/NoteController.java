package org.aubreynicoll.notes.Note;

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NoteController {
	private final NoteRepository db;

	public NoteController(NoteRepository db) {
		this.db = db;
	}


	@GetMapping("/notes")
	public List<Note> all() {
		return db.findAll();
	}

	@PostMapping("/notes")
	public Note create(@RequestBody Note newNote) {
		return db.save(newNote);
	}

	@GetMapping("/notes/{id}")
	public Note one(@PathVariable Long id) {
		return db.findById(id).orElseThrow(() -> new NoteNotFoundException(id));
	}

	@PatchMapping("/notes/{id}")
	public Note update(@PathVariable long id, @RequestBody Note updatedNote) {
		Note note = db.findById(id).orElseThrow(() -> new NoteNotFoundException(id));
		note.setContent(updatedNote.getContent());
		return db.save(note);
	}

	@DeleteMapping("/notes/{id}")
	public void delete(@PathVariable Long id) {
		db.deleteById(id);
	}
}
