package com.comforttravels.mapper;

import com.comforttravels.dto.TestimonialDto;
import com.comforttravels.entity.Testimonial;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface TestimonialMapper {
    TestimonialMapper INSTANCE = Mappers.getMapper(TestimonialMapper.class);
    TestimonialDto toDto(Testimonial e);
    java.util.List<TestimonialDto> toDto(java.util.List<Testimonial> list);
}