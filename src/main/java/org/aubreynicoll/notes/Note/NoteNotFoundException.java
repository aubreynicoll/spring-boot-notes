package org.aubreynicoll.notes.Note;

public class NoteNotFoundException extends RuntimeException {
	public NoteNotFoundException(Long id) {
		super(String.format("Note %d not found", id));
	}
}
